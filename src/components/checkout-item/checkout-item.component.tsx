import { useDispatch, useSelector } from 'react-redux';
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from './checkout-item.styles';

import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types.js';
import { FC, memo } from 'react';

type CheckoutItemProps = {
  cartItem: CartItem;
};

export const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const deleteItemHandler = () =>
    dispatch(deleteItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});
