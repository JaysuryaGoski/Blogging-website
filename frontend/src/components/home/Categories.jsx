import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../../constants/data.js';

// Styled table with border, spacing, and subtle shadow
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  margin: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff; /* White background to align with post section */
  border-radius: 10px;
`;

// Stylish button with modern blue color
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #5b8def; /* Slightly deeper blue for consistency */
  color: #ffffff;
  text-decoration: none;
  font-weight: 600; /* Make the button text bold */
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  border-radius: 8px;
  
  &:hover {
    background-color: #4a7ddc; /* Slightly darker on hover */
  }
`;

// Links that inherit styles with a modern font and clean hover effect
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: 'Montserrat', sans-serif; /* Stylish font */
  font-weight: 500; /* Medium font weight for better readability */
  
  &:hover {
    color: #5b8def; /* Change link color on hover */
  }
`;

// Table Cell Styling for uniformity and space
const StyledTableCell = styled(TableCell)`
  font-family: 'Montserrat', sans-serif; /* Use consistent stylish font */
  padding: 12px;
  font-weight: 500; /* Medium weight for better readability */
  border-bottom: 1px solid rgba(224, 224, 224, 1); /* Consistent border */
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <StyledTableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
