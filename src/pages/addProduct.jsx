import React, { useContext, useEffect, useState } from "react";
import Header from "../component/header/header";
import { Button, Flex, Form, Input } from "antd";
import { useLocation } from "react-router-dom";
import Context from "../context";

function AddProduct() {
    const [data, setData] = useState({
        name: "",
        url: "",
        price: "",
    });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentProductId = params.get("editid");
    const { products, createProduct, editProduct } = useContext(Context);

    useEffect(() => {
        if (currentProductId) {
            const currentProduct = products.find(
                (el) => el.id == currentProductId
            );
            setData(currentProduct);
        } else {
            setData({
                name: "",
                url: "",
                price: "",
            });
        }
    }, [location]);

    function onFinish(e) {
        e.preventDefault();
        if (currentProductId) {
            editProduct(data);
        } else {
            const productData = {
                id: new Date().getTime(),
                date: new Date().getTime(),
                ...data,
            };
            createProduct(productData);
        }

        setData({
            name: "",
            url: "",
            price: "",
        });
    }

    return (
        <>
            <Header />

            <section>
                <div className="container">
                    <Flex justify="center" style={{ marginTop: 100 }}>
                        <form
                            style={{
                                maxWidth: 600,
                            }}
                            onSubmit={onFinish}
                            autoComplete="on"
                        >
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <Input
                                value={data.url}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        url: e.target.value,
                                    })
                                }
                            />

                            <Input
                                value={data.price}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        price: e.target.value,
                                    })
                                }
                            />

                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </form>
                    </Flex>
                </div>
            </section>
        </>
    );
}

export default AddProduct;
