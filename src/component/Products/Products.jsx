import React from "react";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import { Helmet } from "react-helmet";

export default function Products() {
    return (
        <>
            <Helmet>
                <title>Products</title>
                <meta name="description" content="Products Page" />
            </Helmet>
            <FeatureProducts />
        </>
    );
}
