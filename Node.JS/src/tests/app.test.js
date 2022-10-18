const request = require('supertest');
const app = require('../app');

test('Should return 200 status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
});

test('Test response text', async () => {
    const response = await request(app).get('/health');
    expect(response.text).toBe('You keep using that word. I do not think it means what you think it means.');
})

test('Should return 200 status', async () => {
    const response = await request(app).post('/addOrder');
    expect(response.statusCode).toBe(200);
})

test('Test response text', async () => {
    const response = await request(app).post('/addOrder');
    expect(response.text).toBe('New Order Added');
})

test('Should return 200 status', async () => {
    const response = await request(app).get('/listOrdersByCustomer/$CustomerName'); //request is "listOrdersByCustomer/:customerName"
    expect(response.statusCode).toBe(200);
})

test('Should return 200 status', async () => {
    const response = await request(app).put('/updateOrder/3/$orderName'); //request is "updateOrder/:orderNum/:orderNaem"
    expect(response.statusCode).toBe(200);
})

test('Test response text', async () => {
    const response = await request(app).put('/updateOrder/3/$orderName');
    expect(response.text).toBe('Order Updated');
})




