import { createGlobalStyle } from "styled-components"
import { DefaultTheme } from "styled-components"

export const lightTheme: DefaultTheme = {
    body: "#fff",
    fontColor: "#000",
}

export const darkTheme: DefaultTheme = {
    body: "#000",
    fontColor: "#fff",
}

export const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${(props) => props.theme.body}
    }

`