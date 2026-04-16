import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Tabs, Tab, Typography } from "@mui/material"
import Dropdown from "./base/Dropdown"
import { getFonts } from "../../../../api/fonts"
import { useUserContext } from "../../../../context/UserContext"

const buildFontUrl = (family) => {
  const encoded = family.replace(/ /g, '+')
  return `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`
}

// Loads a Google Font stylesheet into <head> if not already loaded.
// Tracks loaded fonts across all instances to avoid duplicate <link> tags.
const loadedFonts = new Set()
const loadFont = (family) => {
  if (loadedFonts.has(family)) return
  loadedFonts.add(family)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = buildFontUrl(family)
  document.head.appendChild(link)
}

// Renders a single option and lazy-loads its font when it scrolls into view
const FontOption = ({ props, family }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadFont(family)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [family])

  return (
    <li {...props} ref={ref}>
      <Typography sx={{ fontFamily: `"${family}", sans-serif` }}>
        {family}
      </Typography>
    </li>
  )
}

const FontPickerDropdown = ({
  value = null,
  onChange,
  label = 'Choose a Font',
  disabled = false,
  onError,
}) => {
  const { user } = useUserContext()
  const [fonts, setFonts] = useState({ popular: [], all: [] })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState(0) // 0 = popular, 1 = all
  const [error, setError] = useState(false)

  const renderFontOption = useCallback((props, option) => {
    const { key, ...rest } = props
    return (
      <FontOption key={key} props={rest} family={option.label} />
    )
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchFonts = async () => {
      try {
        const res = await getFonts(user)
        if (!cancelled) {
          setFonts(res.data)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(true)
          setLoading(false)
          onError?.()
        }
      }
    }

    fetchFonts()
    return () => { cancelled = true }
  }, [user, onError])

  if (error) return null

  const activeList = tab === 0 ? fonts.popular : fonts.all
  const options = activeList.map(font => ({
    label: font.family,
    value: font.family,
  }))

  const selectedOption = value
    ? options.find(o => o.value === value) || null
    : null

  const handleSelect = (option) => {
    if (!option) {
      onChange(null)
      return
    }
    onChange({
      family: option.value,
      url: buildFontUrl(option.value),
    })
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        sx={{ mb: 1, minHeight: 36 }}
      >
        <Tab label="Popular" sx={{ minHeight: 36, py: 0 }} />
        <Tab label="All" sx={{ minHeight: 36, py: 0 }} />
      </Tabs>
      <Dropdown
        options={options}
        value={selectedOption}
        onChange={handleSelect}
        label={label}
        placeholder="Search fonts..."
        loading={loading}
        disabled={disabled}
        renderOption={renderFontOption}
      />
    </Box>
  )
}

export default FontPickerDropdown
