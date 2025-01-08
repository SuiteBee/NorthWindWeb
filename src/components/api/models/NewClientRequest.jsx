export const newClientRequest = (client) => {
    return {
        companyIdentifier: client.clientId,
        companyName: client.company,
        contactInfo: {
            contactName: client.name,
            contactTitle: client.title,
            phone: client.phone,
            fax: client.fax ? client.fax : null
        },
        address: {
            street: client.street,
            city: client.city,
            postalCode: client.postalCode,
            country: client.country,
            region: client.region
        }
    }
}