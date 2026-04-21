import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownFilterProps <T extends { value: string }> = {
    options: T[];
    placeholder: string; 
    onFilterChange: (value: string) => void; 
  };
  
 export const DropdownFilter = <T extends { value: string }>({
  options,
  placeholder,
  onFilterChange,
}: DropdownFilterProps<T>): React.ReactElement => {
    return (
      <Select onValueChange={onFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };