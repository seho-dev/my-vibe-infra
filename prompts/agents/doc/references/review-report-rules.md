# Review Report Rules

## What is Review Report

Code/design review feedback reports. Used for Code Review output, design review documentation, and technical proposal review records.

## Structure

| Section  | Required | Content                           |
| :------- | :------- | :-------------------------------- |
| Overview | Yes      | Review target, date, reviewer     |
| Findings | Yes      | Categorized by severity           |
| Summary  | Yes      | Overall evaluation and next steps |

## Content Rules

### Overview

```markdown
- **Review Target**: Code/Design/Proposal
- **Review Date**: YYYY-MM-DD
- **Reviewer**: Name
```

### Findings

Three severity levels:

**Must Fix (Critical Issues):**

| ID    | File/Location   | Issue Description | Suggested Fix |
| :---- | :-------------- | :---------------- | :------------ |
| R-001 | path/to/file:42 | Specific issue    | Fix approach  |

**Should Fix (Recommended Improvements):**

| ID    | File/Location    | Issue Description | Suggested Fix |
| :---- | :--------------- | :---------------- | :------------ |
| R-002 | path/to/file:100 | Specific issue    | Fix approach  |

**Nice to Have (Optional Optimizations):**

| ID    | File/Location | Optimization             |
| :---- | :------------ | :----------------------- |
| R-003 | path/to/file  | Optimization description |

### Summary

Overall evaluation and next steps.

## Quality Checklist

- [ ] Has overview/summary?
- [ ] Issues have IDs (R-xxx)?
- [ ] Categorized by severity?
- [ ] File locations precise to line number?
- [ ] Clear fix suggestions provided?

## References

- [Review Report Template](../templates/review-report-template.md) - Blank template
