"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getProductById,
  stockFor,
  type Locale,
} from "@/content/catalog";
import {
  countries,
  countryByCode,
  type Country,
  type LanguageId,
  type RegionId,
} from "@/content/regions";

const STORAGE_KEY = "yaselle-store-v1";

export type CartLine = {
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
};

export type FavoriteCollection = {
  id: string;
  name: string;
  productIds: string[];
  shareToken?: string;
  shareEnabled?: boolean;
};

export type Panel = "menu" | "search" | "cart" | "account" | "locale" | null;

type Persisted = {
  region?: RegionId;
  countryCode?: string;
  language?: LanguageId;
  completedGate?: boolean;
  cart: CartLine[];
  collections: FavoriteCollection[];
  recentSearches: string[];
  users: { email: string; password: string }[];
  sessionEmail?: string;
};

const defaultCollections: FavoriteCollection[] = [
  { id: "saved", name: "Saved", productIds: [] },
];

type StoreValue = {
  hydrated: boolean;
  locale: Locale;
  country: Country;
  region: RegionId;
  completedGate: boolean;
  completeGate: (next: {
    region: RegionId;
    countryCode: string;
    language: LanguageId;
  }) => void;
  setLocalePrefs: (next: {
    region?: RegionId;
    countryCode?: string;
    language?: LanguageId;
  }) => void;
  cart: CartLine[];
  cartCount: number;
  addToCart: (line: CartLine) => { ok: boolean; reason?: string };
  updateQty: (line: CartLine, quantity: number) => void;
  removeLine: (line: CartLine) => void;
  collections: FavoriteCollection[];
  isSaved: (productId: string) => boolean;
  toggleSave: (productId: string, collectionId?: string) => void;
  createCollection: (name: string) => void;
  shareCollection: (id: string, enabled: boolean) => string | undefined;
  panel: Panel;
  setPanel: (panel: Panel) => void;
  recentSearches: string[];
  pushSearch: (q: string) => void;
  sessionEmail?: string;
  authError?: string;
  signIn: (email: string, password: string) => boolean;
  createAccount: (email: string, password: string) => boolean;
  signOut: () => void;
  requestReset: () => void;
  mergeOffer: boolean;
  mergeFavorites: () => void;
  dismissMerge: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function lineKey(line: Pick<CartLine, "productId" | "colorId" | "size">) {
  return `${line.productId}:${line.colorId}:${line.size}`;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<Persisted>({
    cart: [],
    collections: defaultCollections,
    recentSearches: [],
    users: [],
  });
  const [panel, setPanel] = useState<Panel>(null);
  const [authError, setAuthError] = useState<string>();
  const [mergeOffer, setMergeOffer] = useState(false);
  const [guestSnapshot, setGuestSnapshot] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Persisted;
          setState({
            cart: parsed.cart ?? [],
            collections: parsed.collections?.length
              ? parsed.collections
              : defaultCollections,
            recentSearches: parsed.recentSearches ?? [],
            users: parsed.users ?? [],
            region: parsed.region,
            countryCode: parsed.countryCode,
            language: parsed.language,
            completedGate: parsed.completedGate,
            sessionEmail: parsed.sessionEmail,
          });
        }
      } catch {
        /* keep defaults */
      }
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.cookie = `yaselle_lang=${state.language ?? "tr"}; path=/; max-age=31536000`;
  }, [hydrated, state]);

  const country = countryByCode(state.countryCode ?? "TR") ?? countries[0];
  const locale: Locale = state.language ?? (country.code === "TR" ? "tr" : "en");
  const region: RegionId = state.region ?? country.region;

  const completeGate = useCallback(
    (next: { region: RegionId; countryCode: string; language: LanguageId }) => {
      setState((current) => ({
        ...current,
        ...next,
        completedGate: true,
      }));
    },
    [],
  );

  const setLocalePrefs = useCallback(
    (next: { region?: RegionId; countryCode?: string; language?: LanguageId }) => {
      setState((current) => ({ ...current, ...next }));
    },
    [],
  );

  const addToCart = useCallback((line: CartLine) => {
    const product = getProductById(line.productId);
    if (!product) return { ok: false, reason: "missing" };
    const available = stockFor(product, line.size);
    if (!line.size) return { ok: false, reason: "size" };
    if (available <= 0) return { ok: false, reason: "stock" };

    setState((current) => {
      const existing = current.cart.find((item) => lineKey(item) === lineKey(line));
      const nextQty = (existing?.quantity ?? 0) + line.quantity;
      if (nextQty > available) {
        return current;
      }
      if (existing) {
        return {
          ...current,
          cart: current.cart.map((item) =>
            lineKey(item) === lineKey(line)
              ? { ...item, quantity: nextQty }
              : item,
          ),
        };
      }
      return { ...current, cart: [...current.cart, line] };
    });
    // Open after the originating click finishes so the sheet is not
    // immediately dismissed as an outside pointer event.
    window.setTimeout(() => setPanel("cart"), 0);
    return { ok: true };
  }, []);

  const updateQty = useCallback((line: CartLine, quantity: number) => {
    const product = getProductById(line.productId);
    const available = product ? stockFor(product, line.size) : 0;
    setState((current) => ({
      ...current,
      cart:
        quantity <= 0
          ? current.cart.filter((item) => lineKey(item) !== lineKey(line))
          : current.cart.map((item) =>
              lineKey(item) === lineKey(line)
                ? { ...item, quantity: Math.min(quantity, available) }
                : item,
            ),
    }));
  }, []);

  const removeLine = useCallback((line: CartLine) => {
    setState((current) => ({
      ...current,
      cart: current.cart.filter((item) => lineKey(item) !== lineKey(line)),
    }));
  }, []);

  const isSaved = useCallback(
    (productId: string) =>
      state.collections.some((collection) =>
        collection.productIds.includes(productId),
      ),
    [state.collections],
  );

  const toggleSave = useCallback((productId: string, collectionId = "saved") => {
    setState((current) => {
      const collections = current.collections.map((collection) => {
        if (collection.id !== collectionId) return collection;
        const has = collection.productIds.includes(productId);
        return {
          ...collection,
          productIds: has
            ? collection.productIds.filter((id) => id !== productId)
            : [...collection.productIds, productId],
        };
      });
      return { ...current, collections };
    });
  }, []);

  const createCollection = useCallback((name: string) => {
    const id = `col-${crypto.randomUUID()}`;
    setState((current) => ({
      ...current,
      collections: [...current.collections, { id, name, productIds: [] }],
    }));
  }, []);

  const shareCollection = useCallback((id: string, enabled: boolean) => {
    let token: string | undefined;
    setState((current) => ({
      ...current,
      collections: current.collections.map((collection) => {
        if (collection.id !== id) return collection;
        token = enabled
          ? collection.shareToken ?? crypto.randomUUID()
          : collection.shareToken;
        return {
          ...collection,
          shareEnabled: enabled,
          shareToken: token,
        };
      }),
    }));
    return token;
  }, []);

  const pushSearch = useCallback((q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    setState((current) => ({
      ...current,
      recentSearches: [
        trimmed,
        ...current.recentSearches.filter((item) => item !== trimmed),
      ].slice(0, 6),
    }));
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const user = state.users.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!user || user.password !== password) {
      setAuthError("auth");
      return false;
    }
    const guestIds = state.collections.flatMap((collection) => collection.productIds);
    setGuestSnapshot(guestIds);
    setState((current) => ({ ...current, sessionEmail: user.email }));
    setAuthError(undefined);
    setMergeOffer(guestIds.length > 0);
    setPanel(null);
    return true;
  }, [state.users, state.collections]);

  const createAccount = useCallback((email: string, password: string) => {
    const exists = state.users.some(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (exists) {
      return signIn(email, password);
    }
    const guestIds = state.collections.flatMap((collection) => collection.productIds);
    setGuestSnapshot(guestIds);
    setState((current) => ({
      ...current,
      users: [...current.users, { email: email.trim(), password }],
      sessionEmail: email.trim(),
    }));
    setAuthError(undefined);
    setMergeOffer(guestIds.length > 0);
    setPanel(null);
    return true;
  }, [signIn, state.users, state.collections]);

  const signOut = useCallback(() => {
    setState((current) => ({ ...current, sessionEmail: undefined }));
  }, []);

  const requestReset = useCallback(() => {
    setAuthError("reset");
  }, []);

  const mergeFavorites = useCallback(() => {
    setState((current) => ({
      ...current,
      collections: current.collections.map((collection) =>
        collection.id === "saved"
          ? {
              ...collection,
              productIds: [...new Set([...collection.productIds, ...guestSnapshot])],
            }
          : collection,
      ),
    }));
    setMergeOffer(false);
  }, [guestSnapshot]);

  const cartCount = state.cart.reduce((sum, line) => sum + line.quantity, 0);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      locale,
      country,
      region,
      completedGate: Boolean(state.completedGate),
      completeGate,
      setLocalePrefs,
      cart: state.cart,
      cartCount,
      addToCart,
      updateQty,
      removeLine,
      collections: state.collections,
      isSaved,
      toggleSave,
      createCollection,
      shareCollection,
      panel,
      setPanel,
      recentSearches: state.recentSearches,
      pushSearch,
      sessionEmail: state.sessionEmail,
      authError,
      signIn,
      createAccount,
      signOut,
      requestReset,
      mergeOffer,
      mergeFavorites,
      dismissMerge: () => setMergeOffer(false),
    }),
    [
      hydrated,
      locale,
      country,
      region,
      state.completedGate,
      state.cart,
      state.collections,
      state.recentSearches,
      state.sessionEmail,
      cartCount,
      completeGate,
      setLocalePrefs,
      addToCart,
      updateQty,
      removeLine,
      isSaved,
      toggleSave,
      createCollection,
      shareCollection,
      panel,
      pushSearch,
      authError,
      signIn,
      createAccount,
      signOut,
      requestReset,
      mergeOffer,
      mergeFavorites,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
