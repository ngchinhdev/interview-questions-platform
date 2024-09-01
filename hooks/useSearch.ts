import { useContext } from "react";
import { SearchContext } from "@components/providers/search-provider";

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};