/**
 * 
 * @description 创建分包路径
 * @param param0 
 * @param index 
 * @returns 
 */
export function createSubRoot({ outputRoot = "auto", sourceRoot = "" }, index) {
    const subRoot = (outputRoot === 'auto' ? `${sourceRoot || 'sub'}-${index}` : outputRoot).replace(/\//g, "-");
    let outputPrefix = subRoot;
    let sourcePrefix = "";
    if (sourceRoot) {
        outputPrefix = `${subRoot}/${sourceRoot}`;
        sourcePrefix = `${sourceRoot}/`
    }
    return {
        subRoot,
        outputPrefix,
        sourcePrefix
    };
}

/**
 * 
 * @description 修正分包跳转路径，在项目中做跳转时使用
 * @param path 
 * @param subPackages 
 * @returns 
 */
export function fixSubPackagesPath(path, subPackages) {
    for (let i = 0, iLen = subPackages.length; i < iLen; i++) {
        const { root: sourceRoot, pages, outputRoot } = subPackages[i];
        const { sourcePrefix, outputPrefix } = createSubRoot({ outputRoot, sourceRoot }, i);
        for (let p = 0, pLen = pages.length; p < pLen; p++) {
            const pagePath = pages[p];
            if (`/${sourcePrefix + pagePath}` === path) {
                return `/${outputPrefix}/${pagePath}`;
            }
        }
    }
    return path;
}

export default {}