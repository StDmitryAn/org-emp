import {makeStyles} from 'tss-react/mui';

const useGlobalStyles = makeStyles()(() => ({
    '@global': {
        body: {
            margin: 0,
            fontFamily: 'Roboto, sans-serif',
        },
    },
}));

export default useGlobalStyles;
