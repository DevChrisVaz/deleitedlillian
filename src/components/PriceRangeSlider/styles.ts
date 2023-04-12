import styled from "styled-components";

export const PriceRangeSliderStyles = styled.div`
    position: relative;
    width: 100%;
    background: none;
    padding: 20px 25px 40px;

    & > .price-input {
        width: 100%;
        display: flex;
        margin: 30px 0 35px;

        & > .field {
            height: 45px;
            width: 100%;
            display: flex;
            align-items: center;

            & > input {
                width: 100%;
                height: 100%;
                font-size: 19px;
                text-align: center;
                margin-left: 12px;
                border: 1px solid #999;
                border-radius: 5px;
                outline: none;
                appearance: none;
                -moz-appearance: textfield;

                &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            }
        }

        & > .separator {
            width: 130px;
            display: flex;
            font-size: 19px;
            align-items: center;
            justify-content: center;
        }
    }

    & > .slider {
        position: relative;
        height: 5px;
        border-radius: 5px;
        background: #ddd;

        & > .progress {
            position: absolute;
            left: 25%;
            right: 25%;
            height: 5px;
            background: #5fcac7;
            border-radius: 5px;
        }

        & > .range-input {
            position: relative;

            & > input {
                position: absolute;
                /* top: -5px; */
                height: 5px;
                width: 100%;
                appearance: none;
                background: none;
                pointer-events: none;
                -webkit-appearance: none;

                &::-webkit-slider-thumb {
                    height: 17px;
                    width: 17px;
                    border-radius: 50%;
                    background: #5fcac7;
                    pointer-events: auto;
                    appearance: none;
                    -webkit-appearance: none;
                }

                &::-moz-range-thumb {
                    height: 17px;
                    width: 17px;
                    border: none;
                    border-radius: 50%;
                    background: #5fcac7;
                    pointer-events: auto;
                    appearance: none;
                    -moz-appearance: none;
                }
            }
        }
    }
`;