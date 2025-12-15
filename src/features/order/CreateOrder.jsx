import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

//loaders are used to fetching data , actions are used to write to data or mutate data
// using form component will act as html form , where we don't need any js or submitting function. react router will take care of all these (no state variable for each input , )
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        {/* 1- use Form component from react-router .. we could add POST, PATCH, DELETE for method , we couldn't use GET (with loader)..action is the path the the form will be submitted to , it is given by default, so no need to write it */}
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* to submit cart data with form data with hidden input */}
          <button>Order now</button>
        </div>
      </Form>
    </div>
  );
}

/* 2- we define action function (convention name) , as soon as we submitted the form,react will create a request that will be intercepted by action function as we connect it with react router , 
a request object will be passed to action function when the form is submitted */
export async function action({ request }) {
  const formData = await request.formData(); // formData() is provided by the browser
  const data = Object.fromEntries(formData); // to help reading data as an object

  //override some data to be as we need
  const order = {
    ...data,
    cart: JSON.stringify(data.cart),
    priority: data.priority === "on", //  to let priority value be true or false , instead of being on or off !
  };

 const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`) // we couldn't use useNavigate here as it is a hook that should be call inside a component function. it returns a response object that let react router go to the path;
}

export default CreateOrder;
