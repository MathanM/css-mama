export interface ColorTypes {
    hex: RGBAType;
    rgb: RGBAType;
    rgba: RGBAType;
    hsl: HSLAType;
    hsla: HSLAType;
}
export interface ColorObject {
    value: any;
    label: string;
    min: string;
    max: string;
}
export interface RGBAType {
    r: ColorObject;
    b: ColorObject;
    g: ColorObject;
    a?: ColorObject;
    value: string;
}
export interface HSLAType {
    h: ColorObject;
    s: ColorObject;
    l: ColorObject;
    a?: ColorObject;
    value: string;
}
