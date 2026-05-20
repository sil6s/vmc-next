"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => (
  <RPNInput.default
    ref={ref}
    className={cn("flex", className)}
    flagComponent={FlagComponent}
    countrySelectComponent={CountrySelect}
    inputComponent={InputComponent}
    smartCaret={false}
    defaultCountry="US"
    value={value || undefined}
    onChange={(val) => onChange?.(val || ("" as RPNInput.Value))}
    {...props}
  />
));
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input className={cn("rounded-l-none border-l-0", className)} {...props} ref={ref} />
  )
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="phone-country-trigger"
          aria-label="Select country"
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown className="phone-country-chevron" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="phone-country-popover">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(v) => {
              setSearchValue(v);
              setTimeout(() => {
                const vp = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]");
                if (vp) vp.scrollTop = 0;
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-64">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange, onSelectComplete }: CountrySelectOptionProps) => (
  <CommandItem
    className="gap-2"
    onSelect={() => {
      onChange(country);
      onSelectComplete();
    }}
  >
    <FlagComponent country={country} countryName={countryName} />
    <span className="flex-1 text-sm">{countryName}</span>
    <span className="text-sm opacity-50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
    <CheckIcon className={cn("ml-auto h-4 w-4", country === selectedCountry ? "opacity-100" : "opacity-0")} />
  </CommandItem>
);

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="phone-flag">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
