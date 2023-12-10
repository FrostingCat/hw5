import { Input } from '@material-ui/core'

export const Search = ({
    onChange,
}: {
    onChange: React.ChangeEventHandler;
}) => {
    return (
        <Input
            type="text"
            onChange={onChange}
            placeholder="Search"
        />
    );
};
