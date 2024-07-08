"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../shared.utils";
import { PopoverProps } from "@radix-ui/react-popover";

export type ComboboxProps<Option> = PopoverProps & {
  /** Whether an option is disabled */
  getOptionDisabled?: (option: Option) => boolean;

  /** The label of an option */
  getOptionLabel: (option: Option) => string;

  /** The value of an option */
  getOptionValue: (option: Option) => string;

  /** Whether an option is selected */
  isOptionEqualToValue?: (option: Option, value: string) => boolean;

  /** The text to show when there are no options */
  noOptionsText?: string;

  /** Callback for when the value changes */
  onChange: (value: string) => void;

  /** The options list */
  options: Option[];

  /** The placeholder text */
  placeholder?: string;

  /** The selected value */
  value: string;
};

export function Combobox<Option>({
  getOptionDisabled,
  getOptionLabel,
  getOptionValue,
  isOptionEqualToValue,
  noOptionsText = "No such option",
  onChange,
  onOpenChange,
  options,
  placeholder = "Select an option",
  value = "",
  ...props
}: ComboboxProps<Option>) {
  return (
    <Popover {...props} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={Boolean(open)}
          className="w-[200px] justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{noOptionsText}</CommandEmpty>
          <CommandGroup>
            {options.map((option, index) => (
              <CommandItem
                key={index}
                value={getOptionValue(option)}
                disabled={getOptionDisabled?.(option)}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  onOpenChange?.(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === getOptionValue(option)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {getOptionLabel(option)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
