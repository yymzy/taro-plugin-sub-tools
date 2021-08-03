/**
 * 
 * @description 创建分包路径
 * @param param0 
 * @param index 
 * @returns 
 */
export function createSubRoot({ outputRoot = "auto", sourceRoot }, index) {
    const subRoot = (outputRoot === 'auto' ? `${sourceRoot}-${index}` : outputRoot).replace(/\//g, "-");
    return {
        subRoot,
        path: `${subRoot}/${sourceRoot}`
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
    for (let i = 0, len = subPackages.length; i < len; i++) {
        const { root: sourceRoot, pages, outputRoot } = subPackages[i];
        const url = pages.find(item => `/${sourceRoot}/${item}` === path);
        if (url) {
            return `/${createSubRoot({ outputRoot, sourceRoot }, i).path}/${url}`;
        }
    }
    return path;
}

export default {}