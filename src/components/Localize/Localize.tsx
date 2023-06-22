import { Helmet } from 'react-helmet';

function Localize() {
  return (
    <Helmet
      script={[
        {
          src: 'https://global.localizecdn.com/localize.js'
        },
        {
          type: 'text/javascript',
          innerHTML: `!function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","getSourceLanguage","detectLanguage","getAvailableLanguages","untranslatePage","bootstrap","prefetch","on","off","hideWidget","showWidget"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);`
        },
        {
          type: 'text/javascript',
          innerHTML: `Localize.initialize({
    key: 'dUsKeghbAi6sC',
    defaultLanguage: 'tr'
  });`
        }
      ]}
    />
  );
}

export default Localize;
