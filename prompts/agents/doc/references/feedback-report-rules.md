# Feedback Report Rules

## What is Feedback Report

User feedback reports documenting issues, suggestions, and improvements. Used for post-release feedback summaries and requirement change records.

## Structure

| Section             | Required | Content                              |
| :------------------ | :------- | :----------------------------------- |
| Overview            | Yes      | Feedback period, count, key findings |
| Feedback Categories | Yes      | Issues + Suggestions                 |
| Action Items        | Yes      | Executable next steps                |

## Content Rules

### Overview

```markdown
- **Feedback Period**: YYYY-MM-DD ~ YYYY-MM-DD
- **Feedback Count**: X items
- **Key Findings**: One-sentence summary
```

### Feedback Categories

**Issues Table:**

| ID    | Issue Description    | Impact Scope   | Priority | Status        |
| :---- | :------------------- | :------------- | :------- | :------------ |
| F-001 | Specific description | Module/Feature | P0/P1/P2 | Pending/Fixed |

**Suggestions Table:**

| ID    | Suggestion          | Expected Benefit | Feasibility     |
| :---- | :------------------ | :--------------- | :-------------- |
| S-001 | Specific suggestion | Business value   | High/Medium/Low |

### Action Items

Use checkbox list, each item must be executable.

```markdown
- [ ] Action item 1
- [ ] Action item 2
```

## Quality Checklist

- [ ] Has overview/summary?
- [ ] Issues have IDs (F-xxx)?
- [ ] Suggestions have IDs (S-xxx)?
- [ ] Priority/status annotated?
- [ ] Clear action items present?

## References

- [Feedback Report Template](../templates/feedback-report-template.md) - Blank template
