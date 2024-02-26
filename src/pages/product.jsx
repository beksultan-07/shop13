import React, { useEffect } from "react";
import Header from "../component/header/header";
import { Flex, Image, Typography } from "antd";
import { useParams } from "react-router-dom";

function Product() {
    const param = useParams();

    useEffect(() => {
        const { id } = param;

        console.log(id);
    }, []);

    return (
        <>
            <Header />

            <Flex gap={20}>
                <Flex flex={1}>
                    <Image
                        style={{ width: "100%" }}
                        src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg"
                    />
                </Flex>

                <Flex vertical gap={20} flex={1}>
                    <Typography>Name: apple</Typography>
                    <Typography>price is 100</Typography>
                </Flex>
            </Flex>
        </>
    );
}

export default Product;
