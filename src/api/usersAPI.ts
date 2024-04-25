import { UserType } from "./types";

export const fakeUserAPI = {
	getUsers: (): Promise<UserType[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const users: UserType[] = [
					{
						id: 0,
						name: "Ayush",
						age: 18,
						twitter: "is_it_ayush_and_loooooooooong_value",
						company: "Doofenshmirtz Evil Inc",
					},
					{
						id: 1,
						name: "John Doe",
						age: 32,
						twitter: "unknown",
						company: "Acme Inc",
					},
					{
						id: 2,
						name: "Jane Doe",
						age: 25,
						twitter: "unknown",
						company: "That Company Pvt. Ltd",
					},
					{
						id: 3,
						name: "Sam Smith",
						age: 18,
						twitter: "hidden",
						company: "Doofenshmirtz Evil Inc",
					},
					{
						id: 4,
						name: "Sara Smith",
						age: 22,
						twitter: "hidden",
						company: "Acme Inc",
					},
					{
						id: 5,
						name: "Christiano Ronaldo",
						age: 37,
						twitter: "Cristiano",
						company: "unknown",
					},
				];

				resolve(users);
			}, 700);
		});
	},
};
