# Solution - Part 1

## Question 1

> ​​Briefly describe each of these terms: ​Unit Testing,​ ​Integration Testing,​ ​System Testing​, ​Acceptance Testing​. You should demonstrate that you understand each of the test levels, how they differ, and how they contribute to better quality software.

### Unit Testing

Unit testing is a development activity which aims to verify each part of the system (each unit or component) independantly and in isolation. Unit tests are particularly useful for encouraging good design when used with TDD. Stubs and dependancy injection are often used to isolate components.

### Integration Testing

Integration tests check that different units work together propperly. At the smalles, they might that check two tiny units work together properly. At the larges, they might exercise code from hundreds of individual units at once. Integration testing is usually a development activity.

### System Testing

System testing is a technical level of testing where all the componets of system are tested as a whole. It might entail testing API calles or communication between the system and external resources.

### Acceptance Testing

Acceptance testing is a form of end-to-end testing where the business acceptability of the system is checked. The most common form is User Acceptance Testing (UAT) where tests are run from the prespective of the end user. This is very hard to automate, and is often conducted by product owners, testers or actual users.

## Question 2

> Explain the term ​Regression Testing​​. Comment on the disadvantages of regression testing (if any) and discuss potential methods of mitigating these disadvantages.

Regression testing is the process of testing changes to make sure that the pre-existing code still works with the new changes. It is not designed to test new code, but to ensure that the new code hasn't caused any unexpected bugs in other parts of the system (these are called regressions). The main disadvantage is the time required to execute all these tests - we can mitigate this somewhat by automating and optimizing the regression test suite.

## Question 3

> In a few paragraphs, using your own words, explain the​ seven testing principles​​.

- **Testing shows the presence of defects** - it cannot show the absence of defects, and does not involve actually fixing the defects.
- **Exhaustive testing is impossible** - it is impossible to test every eventuallity. Even for simple systems, we cannot test every possible set of inputs on every possible combination of hardware, software environment. This is why we must focus our testing on the most important areas.
- **Early Testing** - the sooner we start testing, the more value the tests have. We could, for example, test system requirements before any code is written.
- **Defect clustering** - defects tend to hang out together. Where we find one defect, there will often be more.
- **Pesticide paradox** - The more times we run a test without uncovering a defect, the more certain we can be that that code is bug-free and the less useful that test becomes. (This does not apply fully to automated regression tests, whos purpose is to catch regressions.)
- **Testing is context dependent** - Testing approach depends on the context of the software we develop. We must test the software differently in different contexts - banking applications require a different approach to an e-commerce site, and MVPs will require different testing to an established product.
- **Absence of errors fallacy** - It is impossible to produce 100% bug-free software. Conversely, 99% bug-free software may still be unusable if it does not meet user/business needs.

## Question 4

> Explain ​Exploratory Testing​​, making reference to charters and session sheets. How does exploratory testing differ from other types of manual testing?

Exploratory testing is an approach to software testing that is concisely described as "simultaneous learning, test design and test execution". It differs from other types of testing in that there is no set script, and each mini-test will inform the next test. In place of scripts, chartes are used to describe the scope, aim and techniques of the testing - these charters help to keep the exploration focussed. Session sheets are used to record actions, learning and defects.
