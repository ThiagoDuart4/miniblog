// CONTEXT: uma forma de pegar uma informação de forma geral na nosso aplicação, nesse caso iremos pegar o usuario


import { useContext,createContext } from "react";

const AuthContext = createContext()

export function AuthProvider({children,value}) {
     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthValue() {
    return useContext(AuthContext)
}