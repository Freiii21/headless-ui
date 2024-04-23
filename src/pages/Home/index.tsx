import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { fonts } from "ui/style";
import { RouteListEnum } from "enums";

export const HomePage: FC = () => {
	return (
		<Container>
			<Link to={RouteListEnum.Tables}>Tables</Link>
		</Container>
	);
};

const Container = styled.div`
	${css`
		${fonts.xxl}
	`};
`;
