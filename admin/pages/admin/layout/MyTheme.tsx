import merge from 'lodash/merge'

import { defaultTheme} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const palette = createPalette(merge({},defaultTheme.palette, {
    // primary: {},
    // secondary: {}
}))

const rawTheme = {
    palette: palette,
    shape: {
        borderRadius: 10
    },
    overrides: {
        // Set color at drawer left
        RaMenuItemLink: {
            root: {
                borderLeft: `3px solid white`
            },
            active: {
                borderLeft: `3px solid ${palette.secondary.main}`
            }
        },
        // Remove elevation shadow on cards with first elevation index
        MuiPaper: {
            elevation1: {
                boxShadow: 'none'
            },
            root: {
                border: '1px solid #e0e0e3',
                backgroundClip: 'padding-box'
            }
        }
    }
}
const MyTheme = createMuiTheme(merge({}, defaultTheme, rawTheme))

export default MyTheme;