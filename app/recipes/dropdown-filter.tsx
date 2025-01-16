import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownFilterProps = {
    options: string[];
    placeholder: string; 
    onFilterChange: (value: string) => void; 
  };
  
 export const DropdownFilter: React.FC<DropdownFilterProps> = ({
    options,
    placeholder,
    onFilterChange,
  }) => {
    return (
      <Select onValueChange={onFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };