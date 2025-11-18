import { useState } from 'react';
import LeafProduct from './LeafProduct';

export default function LeafMain({ products }) {

    return (

        <section className="px-4">
            <div className="max-w-[1120px] mx-auto space-y-6 my-4">
                {
                    products.map((product, index) => (
                        <LeafProduct key={index} product={product} />
                    ))
                }
            </div>
        </section>
    );
}
