export interface FlexObject{
    [key: string]: FlexModel[];
}
export interface FlexModel{
    title: string;
    subTitle?: string;
    desc: string[];
    examples?: FlexExample[];
    img?: FlexImage;
}
export interface FlexExample{
    code?: string;
    desc?: string;
}
export interface FlexImage {
    url: string[];
    layout?: string;
}
