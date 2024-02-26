import React, { useContext, useEffect, useState } from "react";
import Header from "../component/header/header";
import { Button, Card, Dropdown, Flex, Input, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import Context from "../context";

const style = {
    marginTop: 50,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
};

function Home() {
    const [data, setData] = useState([]);
    const nav = useNavigate();
    const { products } = useContext(Context);

    useEffect(() => {
        console.log(products);
        setData(products);
    }, []);

    function productClick(id) {
        nav("/product/" + id);
    }

    function searchProduct(e) {
        const searchCard = products.filter((product) =>
            product.name.includes(e.target.value)
        );
        setData(searchCard);
        console.log(data);
    }

    function newFilter() {
        const searchCard = data.sort((a, b) => b.date - a.date);

        setData(searchCard);
    }
    function expensive() {
        
    
        const searchCard = data.sort((a, b) => b.price - a.price);

        setData(searchCard);
    }
    function cheaply() {

        const searchCard = data.sort((a, b) => a.price - b.price);

        setData(searchCard);
    }
    function editClickHandler(e, id) {
        e.stopPropagation();
        nav("/product/create?editid=" + id);
    }

    const items = [
        {
            label: <Button onClick={expensive}>expensive</Button>,
        },
        {
            label: <Button onClick={cheaply}>cheaply</Button>,
        },
        {
            label: <Button onClick={newFilter}>new</Button>,
        },
    ];

    return (
        <>
            <Header />

            <section>
                <div className="container">
                    <Flex gap={20} justify="flex-start">
                        <Flex gap={20}>
                            <Input
                                placeholder="Basic usage"
                                onChange={searchProduct}
                            />

                            <Button>seach</Button>
                        </Flex>

                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <Button onClick={(e) => e.preventDefault()}>
                                Sort by
                            </Button>
                        </Dropdown>
                    </Flex>
                </div>
            </section>

            <section>
                <div className="container">
                    <div style={style}>
                        {data.map((product, index) => {
                            return (
                                <Card
                                    key={index}
                                    hoverable
                                    style={{ width: "100%" }}
                                    onClick={() => productClick(product.id)}
                                    cover={
                                        <img
                                            style={{
                                                height: 250,
                                                objectFit: "cover",
                                            }}
                                            alt="example"
                                            src={product.url}
                                        />
                                    }
                                >
                                    <Meta
                                        title={product.name}
                                        description={product.price}
                                    />

                                    <Button
                                        onClick={(e) =>
                                            editClickHandler(e, product.id)
                                        }
                                    >
                                        Edit
                                    </Button>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
