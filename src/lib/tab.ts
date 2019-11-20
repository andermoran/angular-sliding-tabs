class Tab {
    title: string;
    cssClassName: string;
    constructor(title: string) {
        this.title = title;
        this.cssClassName = title + 'Underlined';
    }
}
export default Tab;