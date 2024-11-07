const addCssToDocument = (_id: string, cssText: string) => {
  const key = `price-block-webfont-${_id}`;
  const currentExtraFonts = document.querySelector(`[data-type='${key}']`);
  if (!currentExtraFonts) {
    const styleElement = document.createElement('style');
    // styleElement.classList.add('extra-fonts');
    styleElement.dataset.type = key;
    styleElement.appendChild(document.createTextNode(cssText));
    document.head.appendChild(styleElement);
  }
};

// const cssToJson = (cssText: string) => {
//   const cssJson = [];
//   const fontFaceRegex = /@font-face\s*{([^}]*)}/g;
//   let match: any;

//   while ((match = fontFaceRegex.exec(cssText)) !== null) {
//     const cssRule = match[1].trim();
//     const ruleJson: any = {};

//     cssRule.split(';').forEach((declaration: { trim: () => { (): any; new (): any; length: number }; split: (arg0: string) => [any, any] }) => {
//       if (declaration.trim().length === 0) return;
//       const [property, value] = declaration.split(':');
//       ruleJson[property.trim()] = value.trim();
//     });

//     cssJson.push(ruleJson);
//   }

//   return cssJson;
// };

interface FontFace {
  fontFamily: string;
  src: string;
  fontStyle?: string;
  fontWeight?: string;
  display?: string;
}

function fontFaceCssToJson(css: string): FontFace[] {
  const fontFaces: FontFace[] = [];
  const fontFaceRegex = /@font-face\s*{([^}]*)}/g;
  let match;

  while ((match = fontFaceRegex.exec(css)) !== null) {
    const properties = match[1]
      .split(';')
      .map((prop) => prop.trim())
      .filter((prop) => prop.length > 0);

    const fontFace: Partial<FontFace> = {};

    properties.forEach((property) => {
      const [key, value] = property.split(':').map((s) => s.trim());
      if (key && value) {
        const camelCaseKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase()) as keyof FontFace;
        fontFace[camelCaseKey] = value.replace(/^['"]|['"]$/g, ''); // Rimuove le virgolette
      }
    });

    // Aggiunge fontFace solo se contiene una fontFamily e un src
    if (fontFace.fontFamily && fontFace.src) {
      fontFaces.push(fontFace as FontFace);
    }
  }

  return fontFaces;
}

const getExtraFonts = async (_id: string, url: string) => {
  const res = await fetch(url);
  const cssText = await res.text();
  // console.log(cssText);
  // const cssJson = cssToJson(cssText);
  const cssJson = fontFaceCssToJson(cssText);
  addCssToDocument(_id, cssText);
  return cssJson;
};

export { addCssToDocument, getExtraFonts };
