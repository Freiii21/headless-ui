import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

import { setupStore, RootState } from "store";
import { DeepPartial } from "types/CommonTypes";

type Props = {
	children: ReactNode;
	initialState?: DeepPartial<RootState>;
};

export const StoreProvider: FC<Props> = ({ children, initialState }) => {
	const store = setupStore(initialState as RootState);

	return <Provider store={store}>{children}</Provider>;
};
