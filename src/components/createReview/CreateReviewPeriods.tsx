import { useIntl } from "react-intl";
import { Period } from "../../utils/types";
import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "../ui/select";

interface CreateReviewPeriodsProps {
  selectedPeriod: Period | null;
  setSelectedPeriod: (value: Period) => void;
  periods: Period[];
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewPeriods = ({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  showError,
  setShowError,
}: CreateReviewPeriodsProps) => {
  const intl = useIntl();
  const periodMap = new Map<string, Period>();

  useEffect(() => {
    periodMap.clear();
    periods.forEach((period) => {
      periodMap.set(period.name, period);
    });
  });

  const textConstants = {
    periodNotSelectedError: intl.formatMessage({
      id: "periodNotSelectedError",
    }),
    selectPeriodText: intl.formatMessage({ id: "selectPeriodText" }),
  };

  const handleSelectChange = (selectedPeriod: string) => {
    setSelectedPeriod(periodMap.get(selectedPeriod)!);
    setShowError(selectedPeriod === "");
  };

  return (
    <div className="mb-4">
      <span id="selected-period-label">{textConstants.selectPeriodText}</span>
      <Select
        value={selectedPeriod ? selectedPeriod.name : ""}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={textConstants.selectPeriodText} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{textConstants.selectPeriodText}</SelectLabel>
            {periods.map((period, index) => (
              <SelectItem value={period.name} key={index}>
                {period.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {showError && (
        <span className="mt-2 text-red-500">
          {textConstants.periodNotSelectedError}
        </span>
      )}
    </div>
  );
};

export default CreateReviewPeriods;
