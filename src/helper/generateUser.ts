export const generateBulletPoints = (data: any) => {
    if (!data) return "";
    return `
        <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Address:</strong> ${data.address}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
        </ul>
    `;
};