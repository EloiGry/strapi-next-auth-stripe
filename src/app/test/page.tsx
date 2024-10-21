'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/actions/orders';

const handleClick = async() => {
    await createOrder(7, 1)
}
const page = 
() => {
    return (
        <div>
            <Button onClick={() => 
                handleClick()}> Order </Button>
        </div>
    );
};

export default page;