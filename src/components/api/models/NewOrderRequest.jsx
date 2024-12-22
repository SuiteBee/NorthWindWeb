export const newOrder = (order) => {
    return {
        customerId: order.client.id,
        employeeId: 6,
        carrierId: order.shipping.carrierId,
        shipCost: order.shipping.shipCost,
        shipName: order.shipping.name,
        address: {
            street: order.shipping.street,
            city: order.shipping.city,
            postalCode: order.shipping.postalCode,
            country: order.shipping.country,
            region: order.shipping.region
        },
        orderDetail: order.product.map((item) => {
            return{
                productId: item.productId,
                quantity: item.quantity,
                discount: item.discount
            }
        })
    }
}