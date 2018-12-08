import styled from 'styled-components';

export const MenuNameStyled = styled.div`
  font-weight: 600;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ByBrandNameStyled = styled.div`
  font-size: 12px;
  color: #999;
`;

export const ViewMealsInThisMenu = styled.div`
  color: #f68b40;
  font-size: 12px;
  font-style: italic;
  text-decoration: underline;
  margin-top: 10px;
  cursor: pointer;
`;

export const ServiceTimeStyled = styled.div`
  color: #9d9d9d;
`;

export const NoteStyled = styled.section`
  margin-bottom: 5px;
`;

export const NoteWrapperStyled = styled.div`
  margin-top: 12px;
`;

export const MenuPriceStyled = styled.span`
  font-size: 12px;
`;

export const ShippingFeeStyled = styled.span`
  font-size: 12px;
`;

export const SubTotalStyled = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

export const EditingActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > button:not(:first-child) {
    margin-top: 5px;
  }
`;

export const MealListStyled = styled.ul`
  padding: 20px 20px 20px 30px;
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.65);
  list-style-type: decimal;
  border: 1px dashed;
  font-size: 13px;
  font-style: italic;
`;
