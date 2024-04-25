import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { UserType } from "api/types";
import { fakeUserAPI } from "api/usersAPI";
import { JustTable } from "./JustTable";

export const Tables: FC = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		(async () => {
			try {
				const data = await fakeUserAPI.getUsers();
				setUsers(data);
			} catch {
				setErrorMessage("Failed to load users...");
			}
		})();
	}, []);

	if (!users.length || errorMessage) {
		return <>{errorMessage || "Loading..."}</>;
	}

	return (
		<Container>
			<JustTable title={"Just table"} users={users} />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
`;
