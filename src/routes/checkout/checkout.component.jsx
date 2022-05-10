import { useSelector } from 'react-redux';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import {
  selectCartItems,
  selectNewTotal,
} from '../../store/cart/cart.selector';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';

export const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectNewTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${total}</Total>
    </CheckoutContainer>
  );
};
