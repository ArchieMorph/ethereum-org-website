import React, { useState } from "react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Select from "../Select"
import ButtonLink from "../ButtonLink"
import Emoji from "../OldEmoji"
import Translation from "../Translation"

import { trackCustomEvent } from "../../utils/matomo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.layer2Gradient};
  border-radius: 0.25rem;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1.5rem;
  }
  span {
    color: ${({ theme }) => theme.colors.text200};
  }
`

const SelectContainer = styled.div`
  margin: 1rem 0;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    a {
      width: 100%;
    }
  }
`
export interface IProps {}

const StakingLaunchpadWidget: React.FC<IProps> = () => {
  const { t } = useTranslation()
  const [selection, setSelection] = useState("testnet")

  const handleChange = (e) => {
    trackCustomEvent({
      eventCategory: `Selected testnet vs mainnet for Launchpad link`,
      eventAction: `Clicked`,
      eventName: `${e.label} bridge selected`,
      eventValue: `${e.value}`,
    })
    setSelection(e.value)
  }

  const data = {
    testnet: {
      label: "Goerli testnet",
      url: "https://goerli.launchpad.ethereum.org",
    },
    mainnet: {
      label: "Mainnet",
      url: "https://launchpad.ethereum.org",
    },
  }

  const selectOptions = Object.keys(data).map((key) => ({
    label: data[key].label,
    value: key,
  }))

  return (
    <Container>
      <div>
        <span>
          <Translation id="page-staking-launchpad-widget-span" />
        </span>
        <SelectContainer>
          <Select
            options={selectOptions}
            onChange={handleChange}
            defaultValue={selectOptions[0]}
            maxW={{ md: "50%" }}
          />
        </SelectContainer>
        <p>
          <Translation id="page-staking-launchpad-widget-p1" />
        </p>
        <p>
          <Translation id="page-staking-launchpad-widget-p2" />
        </p>
        <ButtonContainer style={{ marginBottom: "1rem" }}>
          <ButtonLink to={data[selection].url}>
            {selection === "mainnet"
              ? t("page-staking-launchpad-widget-mainnet-start")
              : t("page-staking-launchpad-widget-testnet-start")}
          </ButtonLink>
        </ButtonContainer>
        <p>
          <Translation id="page-staking-launchpad-widget-p3" />
        </p>
        <ButtonContainer>
          <ButtonLink to="#node-and-client-tools" variant="outline">
            <Emoji text="🛠" mr="1rem" />
            <Translation id="page-staking-launchpad-widget-link" />
          </ButtonLink>
        </ButtonContainer>
      </div>
    </Container>
  )
}

export default StakingLaunchpadWidget
