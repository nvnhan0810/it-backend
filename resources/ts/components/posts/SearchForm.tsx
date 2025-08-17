import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchFormProps = {
  onSearch: (search: string) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <Input type="text" placeholder="Tìm kiếm" name="search" className="w-full max-w-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button variant="outline" onClick={handleSearch}>Tìm kiếm</Button>
    </div>
  );
};

export default SearchForm;
