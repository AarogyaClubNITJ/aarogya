function getimageURL(name) {
    return new URL(`../assets/team/${name}`, import.meta.url).href;
}

export { getimageURL };