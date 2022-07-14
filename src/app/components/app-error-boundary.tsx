import React from 'react';
import { Button } from '@mui/material';
import { BaseCenterLayout, BasePaperTitledBox } from '~/1st-react-ui';

type AppErrorBoundaryState = {
  hasError: boolean;
  errorTitle: string;
};

export class AppErrorBoundary extends React.Component<any, AppErrorBoundaryState> {
  state = {
    hasError: false,
    errorTitle: '',
  };

  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError error >>>', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('COMPONENT CATCH ERROR >>>', error, errorInfo);
    this.setState({
      hasError: true,
      errorTitle: error.message,
    });
  }

  resetError = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <BaseCenterLayout>
          <BasePaperTitledBox title={this.state.errorTitle}>
            <Button
              onClick={this.resetError}
              fullWidth
            >
              Reset
            </Button>
          </BasePaperTitledBox>
        </BaseCenterLayout>
      );
    }
    return this.props.children;
  }
}
