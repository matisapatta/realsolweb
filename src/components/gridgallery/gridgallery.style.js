import styled from 'styled-components';

const TileImg = styled.img`
	width: 100%;
	transition: transform 500ms ease;
	&:hover {
		transform: scale(1.1);
	}
`

export { TileImg }