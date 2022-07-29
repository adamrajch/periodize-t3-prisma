// import Document from 'next/document';
// import { createGetInitialProps } from '@mantine/next';

// const getInitialProps = createGetInitialProps();

// export default class _Document extends Document {
//   static getInitialProps = getInitialProps;
// }

// _document.tsx;
import Document, { DocumentContext } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { rtlCache } from 'styles/rtl-cache';

const stylesServer = createStylesServer(rtlCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
      ],
    };
  }
}
