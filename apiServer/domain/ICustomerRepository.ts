import Customer from "./Customer";

export default interface ICustomerRepository {
    getCustomerById(customerId: number): Customer;
}