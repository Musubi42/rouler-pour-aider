const headerActiveLink = ref('');

export function useHeaderActiveLink() {
    function setHeaderActiveLink(link) {
        headerActiveLink.value = link;
    }

    function isHeaderActiveLink(link) {
        return headerActiveLink.value === link;
    }

    return { setHeaderActiveLink, isHeaderActiveLink };
}
