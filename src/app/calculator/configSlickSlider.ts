import {ISlickSliderProps} from "../slick-slider/ISlickSliderProps";

const configBase: ISlickSliderProps = {
    arrows: false,
    slidesToScroll: 1,
};

export const configSlickSliderDesktop: ISlickSliderProps = {
    ...configBase,
    slidesToShow: 4,
};

export const configSlickSliderMobile: ISlickSliderProps = {
    ...configBase,
    dots: true,
    slidesToShow: 1,
};
